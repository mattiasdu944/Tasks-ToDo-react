import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../backend/supabase";

export const useVerification =  () => {

    const navigate = useNavigate()
    useEffect(() => {
        if(!supabase.auth.user()){
            navigate('/')
        }
        else{
            navigate('/dashboard')
        }
    },[])
}