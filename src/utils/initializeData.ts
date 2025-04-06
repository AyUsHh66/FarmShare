export const initializeData = () => {
  // Initialize equipment data if not exists
  if (!localStorage.getItem('equipment')) {
    const sampleEquipment = [
      {
        id: 1,
        name: "John Deere Tractor",
        description: "Powerful tractor suitable for all farming needs",
        price: "2,500",
        location: "Mumbai, Maharashtra",
        images: ["https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg"],
        availableFrom: "2024-03-01",
        availableTo: "2024-12-31",
        insuranceRequired: true,
        ownerId: "1",
        ownerName: "John Doe"
      },
      {
        id: 2,
        name: "Harvester Machine",
        description: "Modern harvester for efficient crop collection",
        price: "3,500",
        location: "Delhi, NCR",
        images: ["https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg"],
        availableFrom: "2024-03-01",
        availableTo: "2024-12-31",
        insuranceRequired: true,
        ownerId: "2",
        ownerName: "Jane Smith"
      }
    ];
    localStorage.setItem('equipment', JSON.stringify(sampleEquipment));
  }

  // Initialize users data if not exists
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123"
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123"
      }
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }
}; 