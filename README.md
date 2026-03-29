# Flipkart Clone – Full Stack E-Commerce Web Application

## Project Description
This project is a full-stack e-commerce web application inspired by Flipkart. The application allows users to browse products, view product details, add items to the cart, and place orders. The project replicates Flipkart's UI design and core e-commerce functionality.

---

## Features
- Product listing page (Home page)
- Product detail page
- Add to Cart functionality
- Cart page with quantity management
- Checkout page
- Order success page
- Flipkart-style responsive UI
- Backend API for products and cart
- Product image support

---

## Tech Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript
- Axios

### Backend
- Django
- Django REST Framework

### Database
- SQLite

---

## Project Structure
```
flipkart-clone/
│
├── backend/
│   ├── api/
│   ├── products/
│   ├── cart/
│   ├── db.sqlite3
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│
├── README.md
└── .gitignore
```

---

## Installation and Setup

### 1. Clone Repository
```
git clone https://github.com/deepankk2004/flipkart-clone.git
cd flipkart-clone
```

### 2. Backend Setup (Django)
```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend will run on:
```
http://127.0.0.1:8000
```

### 3. Frontend Setup (React)
Open new terminal:
```
cd frontend
npm install
npm start
```

Frontend will run on:
```
http://localhost:3000
```

---

## API Endpoints
| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | /api/products/ | Get all products |
| GET | /api/products/<id>/ | Get single product |
| GET | /api/cart/ | Get cart items |
| POST | /api/cart/add/ | Add to cart |
| POST | /api/cart/remove/ | Remove from cart |

---

## Future Improvements
- User Login/Signup
- Online Payment Integration
- Order History
- Admin Panel
- Search and Filters
- Deployment (Render/Vercel)

---

## Author
Deepank Yadav  
Computer Science Engineering Student  
GitHub: https://github.com/deepankk2004

---

## License
This project is for educational purposes only.

---

## Screenshots
(Add project screenshots here later)
- Home Page
- Product Page
- Cart Page
- Checkout Page
