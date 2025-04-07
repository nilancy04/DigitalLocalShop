import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:3005/api/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
            setFile(null);
        } catch (err) {
            setError('Error uploading file. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Products CSV</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select CSV File
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        aria-label="Select CSV file to upload"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {file && (
                        <p className="mt-1 text-sm text-gray-600">
                            Selected file: {file.name}
                        </p>
                    )}
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                        !file || loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Uploading...' : 'Upload CSV'}
                </button>

                {message && (
                    <div className="p-3 bg-green-100 text-green-700 rounded-md">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mt-4 text-sm text-gray-600">
                    <p className="font-medium mb-2">CSV Format Requirements:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>File must be in CSV format</li>
                        <li>Required columns: name, description, price, stock, category, image_url</li>
                        <li>Price should be a number</li>
                        <li>Stock should be a number</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CsvUpload; 