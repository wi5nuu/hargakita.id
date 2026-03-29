import { databases, APPWRITE_CONFIG } from './appwrite';
import { komoditasList } from '../data';

export const seedKomoditasData = async () => {
  try {
    console.log('Starting to seed data...');
    let successCount = 0;
    
    // Using sequential loop to prevent rate limit errors
    for (const item of komoditasList) {
      try {
        await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collections.komoditas,
            item.id,
            {
                nama: item.nama,
                namaLengkap: item.namaLengkap,
                kategori: item.kategori,
                icon: item.icon,
                satuan: item.satuan,
                harga: item.harga,
                hargaSebelumnya: item.hargaSebelumnya,
                perubahan: item.perubahan,
                perubahanPersen: item.perubahanPersen,
                tren: item.tren
            }
        );
        successCount++;
        console.log(`✅ Seeded: ${item.nama}`);
      } catch (err: any) {
        // Specifically ignore document already exists error (Code 409) if they already have Beras
        if (err.code === 409) {
             console.log(`⏩ Skipped (Already exists): ${item.nama}`);
             continue; // Proceed to next
        }
        console.error(`❌ Failed to seed ${item.nama}:`, err.message);
      }
    }
    
    console.log(`🎉 Seeding complete! Added ${successCount} new items.`);
    return true;
  } catch (error) {
    console.error('Fatal seeding error:', error);
    return false;
  }
};
