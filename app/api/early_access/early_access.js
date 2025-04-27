import { supabase } from '../../../services/supabase';

const addEmailToEarlyAccess = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const { data, error } = await supabase
            .from('early_access')
            .insert([{ email }]);

        if (error) {
            throw error;
        }

        return res.status(200).json({ message: 'Email added successfully', data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default addEmailToEarlyAccess;