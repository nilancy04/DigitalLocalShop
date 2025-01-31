# DigitalLocalShop
# Community-Driven Local Shopping Platform

## Introduction
This project aims to revolutionize local shopping by providing real-time inventory updates, price comparisons, and community-driven reviews. Our platform bridges the gap between traditional shopping and modern e-commerce by making local commerce more transparent, accessible, and efficient.

## Features
- **Real-Time Inventory Updates**: Instantly check stock availability at nearby stores.
- **Price Comparison Tool**: Compare prices across local stores to find the best deals.
- **Store Ratings & Reviews**: Community-driven insights on store quality and reliability.
- **User-Friendly Interface**: A simple and intuitive interface built with React.js.
- **Scalability & Performance**: Uses cloud hosting for efficient performance.

## Tech Stack
### Frontend:
- React.js for responsive UI development.

### Backend:
- Node.js and Express.js for API development.
- PostgreSQL for structured data management.
- Socket.IO for real-time inventory updates.

### Cloud Hosting:
- AWS or Google Cloud for scalability and reliability.

## Database Schema
### Tables:
1. **Users** - Stores user information.
2. **Stores** - Stores retailer information.
3. **Products** - Stores product details.
4. **Inventory** - Tracks product availability at stores.
5. **Reviews** - Contains user-generated ratings and feedback.
6. **PriceComparison** - Stores real-time price comparisons for products.

## Installation & Setup
### Prerequisites:
- Node.js and npm installed
- PostgreSQL installed

### Steps:
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/digitalocalshop.git
   cd digitalocalshop
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Database**
   - Create a PostgreSQL database.
   - Run the SQL scripts to set up tables.

4. **Start the Backend Server**
   ```sh
   node server.js
   ```

5. **Start the Frontend**
   ```sh
   cd client
   npm start
   ```

## API Endpoints
- `GET /stores` - Fetch all stores.
- `GET /products/:store_id` - Get products for a store.
- `POST /review` - Add a review.
- `PUT /inventory/update` - Update inventory in real-time.

## Future Enhancements
- Implement AI-driven demand forecasting.
- Introduce personalized recommendations for users.
- Expand to mobile apps using React Native.

## Contributors
- **Nilancy Agarwal** 
- Priyam Prasad Sahoo
- Kangkana Barman
- Agnik Dutta

## License
This project is licensed under the MIT License.

