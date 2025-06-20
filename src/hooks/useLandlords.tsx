
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Landlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export const useLandlords = () => {
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLandlords = async () => {
    try {
      const { data, error } = await supabase
        .from('landlords')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Error fetching landlords');
        console.error('Error:', error);
        return;
      }

      setLandlords(data || []);
    } catch (error) {
      toast.error('Error fetching landlords');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLandlord = async (landlordData: Omit<Landlord, 'id' | 'created_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to add landlords');
        return;
      }

      const { data, error } = await supabase
        .from('landlords')
        .insert([
          {
            ...landlordData,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        toast.error('Error adding landlord');
        console.error('Error:', error);
        return;
      }

      setLandlords(prev => [data, ...prev]);
      toast.success('Landlord added successfully!');
      return data;
    } catch (error) {
      toast.error('Error adding landlord');
      console.error('Error:', error);
    }
  };

  const updateLandlord = async (id: string, updates: Partial<Omit<Landlord, 'id' | 'created_at'>>) => {
    try {
      const { data, error } = await supabase
        .from('landlords')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast.error('Error updating landlord');
        console.error('Error:', error);
        return;
      }

      setLandlords(prev => prev.map(landlord => 
        landlord.id === id ? data : landlord
      ));
      toast.success('Landlord updated successfully!');
      return data;
    } catch (error) {
      toast.error('Error updating landlord');
      console.error('Error:', error);
    }
  };

  const deleteLandlord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('landlords')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Error deleting landlord');
        console.error('Error:', error);
        return;
      }

      setLandlords(prev => prev.filter(landlord => landlord.id !== id));
      toast.success('Landlord deleted successfully!');
    } catch (error) {
      toast.error('Error deleting landlord');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  return {
    landlords,
    loading,
    addLandlord,
    updateLandlord,
    deleteLandlord,
    refetch: fetchLandlords,
  };
};
