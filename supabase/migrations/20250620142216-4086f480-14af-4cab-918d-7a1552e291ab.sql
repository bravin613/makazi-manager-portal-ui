
-- Create landlords table
CREATE TABLE public.landlords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create properties table (for future use)
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  landlord_id UUID REFERENCES public.landlords(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  property_type TEXT NOT NULL,
  units INTEGER DEFAULT 1,
  rent_amount DECIMAL(10,2),
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table (for future use)
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.landlords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for landlords table
CREATE POLICY "Users can view their own landlords" 
  ON public.landlords 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own landlords" 
  ON public.landlords 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own landlords" 
  ON public.landlords 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own landlords" 
  ON public.landlords 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for properties table
CREATE POLICY "Users can view their own properties" 
  ON public.properties 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own properties" 
  ON public.properties 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own properties" 
  ON public.properties 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own properties" 
  ON public.properties 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for payments table
CREATE POLICY "Users can view their own payments" 
  ON public.payments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments" 
  ON public.payments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments" 
  ON public.payments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payments" 
  ON public.payments 
  FOR DELETE 
  USING (auth.uid() = user_id);
