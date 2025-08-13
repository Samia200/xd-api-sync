import { useState, useEffect } from 'react';

interface PatientData {
  name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  profile_picture: string;
  diagnosis_history: Array<{
    month: string;
    year: number;
    blood_pressure: {
      systolic: { value: number; levels: string };
      diastolic: { value: number; levels: string };
    };
    heart_rate: { value: number; levels: string };
    respiratory_rate: { value: number; levels: string };
    temperature: { value: number; levels: string };
  }>;
  diagnostic_list: Array<{
    name: string;
    description: string;
    status: string;
  }>;
  lab_results: Array<string>;
}

const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const USERNAME = 'coalition';
const PASSWORD = 'skills-test';

export const usePatientData = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = btoa(`${USERNAME}:${PASSWORD}`);
        const response = await fetch(API_URL, {
          headers: {
            'Authorization': `Basic ${credentials}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }

        const data = await response.json();
        
        // Find Jessica Taylor in the response
        const jessicaData = data.find((patient: PatientData) => 
          patient.name === 'Jessica Taylor'
        );

        if (jessicaData) {
          setPatientData(jessicaData);
        } else {
          throw new Error('Jessica Taylor not found in patient data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { patientData, loading, error };
};