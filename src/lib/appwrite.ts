import { Client, Databases, Account, Storage, Functions } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.error('Appwrite Project ID or Endpoint is missing! Please check your .env file.');
}

export const client = new Client();

client
  .setEndpoint(endpoint || 'https://cloud.appwrite.io/v1')
  .setProject(projectId || '');

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// Appwrite Config Constants
export const APPWRITE_CONFIG = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || 'hargakita_db',
  collections: {
    komoditas: import.meta.env.VITE_APPWRITE_COLLECTION_ID || 'harga_komoditas',
    laporan: 'laporan_warga',
    berita: 'berita',
  }
};
