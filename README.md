# Personalized Learning Path Platform

A comprehensive learning management system that provides personalized educational roadmaps and AI-powered assessments to help users achieve their learning goals.

## 🌟 Features

### 📚 Learning Management

- **Personalized Roadmaps**: Custom learning paths based on user goals and skill levels
- **Progress Tracking**: Visual progress indicators and milestone tracking
- **Goal Setting**: Set and monitor learning objectives
- **Dashboard**: Comprehensive overview of learning progress and achievements

### 🧠 AI-Powered Assessment System

- **Dynamic Quiz Generation**: Create quizzes on any topic using Google's Gemini AI
- **Interactive Quiz Interface**: User-friendly quiz taking experience with navigation
- **Detailed Results**: Comprehensive feedback with correct/incorrect answer explanations
- **Performance Analytics**: Score tracking and performance insights
- **Retake Options**: Ability to retake quizzes or try different topics

### 🔐 Authentication & Security

- **User Registration & Login**: Secure user authentication system
- **Password Reset**: Email-based password recovery
- **Protected Routes**: Secure access to learning content
- **JWT Authentication**: Token-based authentication for API security

### 📱 Modern User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX**: Beautiful gradient designs and smooth animations
- **Interactive Components**: Engaging user interface elements
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Tech Stack

### Frontend

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communication
- **CSS3**: Custom styling with modern design patterns
- **Vite**: Fast build tool and development server

### Backend

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token for authentication
- **Google Gemini AI**: AI-powered quiz generation
- **Nodemailer**: Email service for password reset

## 📁 Project Structure

```
personalized-learning-path/
├── Backend/
│   ├── Controllers/          # API route handlers
│   │   ├── Auth.js
│   │   ├── roadmapController.js
│   │   └── userRoadmapcontrollers.js
│   ├── Middleware/           # Authentication middleware
│   │   └── middlewareAuth.js
│   ├── Models/              # Database models
│   │   ├── Users.js
│   │   ├── Raodmap.js
│   │   └── userRoadmap.js
│   ├── Routes/              # API routes
│   │   ├── auth.js
│   │   ├── roadmapRoutes.js
│   │   ├── assessmentRoute.js
│   │   └── userRoadmapRoutes.js
│   ├── Service/             # External services
│   │   └── emailService.js
│   └── server.js            # Main server file
├── Frontend/
│   ├── src/
│   │   ├── Components/      # React components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Dashboard/   # Dashboard components
│   │   │   ├── Roadmap/     # Roadmap components
│   │   │   └── Assessement/ # Assessment components
│   │   ├── Api/            # API service layer
│   │   ├── Context/        # React context providers
│   │   └── util/           # Utility components
│   └── public/             # Static assets
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Backend directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-path
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   CLIENT_ORIGIN=http://localhost:5173
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   PORT=3002
   ```

4. **Start the server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Frontend directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3002
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Getting Started

1. **Register**: Create a new account or login with existing credentials
2. **Dashboard**: View your learning progress and quick actions
3. **Roadmaps**: Browse and select learning paths
4. **Assessment**: Take AI-generated quizzes on any topic

### Taking an Assessment

1. Click "Take Assessment" from the dashboard
2. Enter any topic you want to be tested on
3. Answer the AI-generated multiple-choice questions
4. Review your results with detailed feedback
5. Retake the quiz or try a different topic

### Managing Learning Paths

1. Navigate to "Browse Roadmaps" from the dashboard
2. Select a roadmap that matches your learning goals
3. Track your progress through the visual roadmap
4. Complete milestones and advance to the next level

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `POST /api/password-reset/request` - Request password reset
- `POST /api/password-reset/reset` - Reset password

### Roadmaps

- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:id` - Get specific roadmap
- `POST /api/user-roadmaps` - Assign roadmap to user
- `GET /api/user-roadmaps` - Get user's roadmaps

### Assessment

- `POST /api/assessment` - Generate quiz for topic
- `POST /api/assessment/submit` - Submit quiz answers

### User Dashboard

- `GET /api/user/stats` - Get user statistics
- `GET /api/user/recent-activity` - Get recent activity
- `GET /api/user/learning-path` - Get learning path

## 🎨 Customization

### Adding New Assessment Topics

The assessment system uses Google's Gemini AI to generate questions. Simply enter any topic in the assessment interface, and the AI will create relevant questions.

### Styling

- Modify `Frontend/src/Components/Assessement/Assessment.css` for assessment styling
- Update `Frontend/src/Components/Dashboard/Dashboard.css` for dashboard styling
- Customize colors, fonts, and layouts as needed

### Adding New Roadmaps

1. Use the populate script: `Backend/scripts/populateRoadmaps.js`
2. Add new roadmap data to the database
3. Update the roadmap display components

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or AWS
4. Ensure CORS is properly configured for your frontend domain

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Update API base URL for production environment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the documentation for common solutions
- Review the API endpoints for integration help

## 🔮 Future Enhancements

- [ ] Social learning features (study groups, forums)
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with external learning platforms
- [ ] Gamification elements (badges, leaderboards)
- [ ] Video content integration
- [ ] Offline learning capabilities
- [ ] Multi-language support

## 🙏 Acknowledgments

- Google Gemini AI for quiz generation
- React community for excellent documentation
- MongoDB for database services
- All contributors and testers

---

**Happy Learning! 🎓**
