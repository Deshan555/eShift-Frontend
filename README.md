
# eShift Frontend

## Project Overview
eShift is a modern logistics and fleet management platform designed to streamline operations for transport companies and logistics providers. It solves the challenges of real-time job tracking, driver management, and reporting, providing an intuitive interface for dispatchers, managers, and drivers.


**Target Users:**
- Logistics companies
- Fleet managers
- Dispatchers
- Drivers

---

## 🚦 Workflow Breakdown

### 1. Customer Job Creation 📝
- Customers register via the portal and define a new job.
- A job can include multiple **JobStops** (one-to-many relationship, e.g., pickup and delivery points).
- Upon job creation, the backend automatically generates a **Trip** linked to the job.

### 2. Admin Job Approval and Trip Assignment ✅
- Admins review and approve jobs.
- Post-approval, admins assign:
	- 🏗️ A **Container** and 🚚 **Truck** for the trip.
	- 👨‍✈️ A **Driver** and optionally an 🧑‍🤝‍🧑 **Assistant**.
- The trip is scheduled and marked as **START** 🚦.

### 3. Load Creation ⚖️
- Once the trip starts, a **Load** record is created, capturing:
	- ⚖️ Weight
	- 📦 Volume
	- 🔢 Start and end meter readings (for tracking distance or fuel usage).

### 4. Job Completion and Slip Generation 🧾
- After the job is completed, admins generate a **Slip** (e.g., delivery receipt, invoice, or proof of completion).

### 5. Admin Portal Features 🛠️
- **Custom Management:** Manage customers, roles, vehicles, and drivers.
- **Dashboards:** 📊 Overview of operations (active trips, pending jobs).
- **Dynamic Reports:** 📈 Customizable reports for metrics like trip efficiency, driver performance, or job completion rates.
- **Live Map Integrations:** 🗺️ Real-time tracking of vehicles or trips, using APIs like Google Maps, Mapbox, etc.

---

## Features
- Real-time job and trip tracking
- Interactive dashboard and analytics
- Driver and vehicle management
- Invoice generation and reporting
- Route mapping and optimization
- Role-based access control (Admins, Assistants, Drivers, etc.)
- Customizable stops and job paths
- Secure authentication and authorization

## Tech Stack
- **Frontend:** Next.js, React
- **Languages:** JavaScript, JSX
- **Styling:** CSS Modules, Custom CSS
- **State Management:** React Context API
- **APIs:** RESTful API integration
- **Tools:** ESLint, Vercel (deployment)

## Installation
```bash
git clone https://github.com/Deshan555/eShift-Frontend.git
cd eShift-Frontend/frontend
npm install
```

## Usage
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

**Example:**
- Log in as an admin to access the dashboard and manage jobs.
- Use the sidebar to navigate between modules (Drivers, Jobs, Reports, etc.).

## Configuration
Set up the following environment variables in a `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=<your_api_url>
NEXT_PUBLIC_MAP_API_KEY=<your_map_api_key>
```
Adjust other settings in `next.config.mjs` as needed.

## Folder Structure
```
frontend/
├── public/           # Static assets (images, icons)
├── screenshots/      # Project screenshots
├── src/
│   ├── components/   # Reusable React components
│   ├── pages/        # Next.js pages and API routes
│   └── styles/       # CSS and font files
├── package.json      # Project metadata and dependencies
├── next.config.mjs   # Next.js configuration
└── README.md         # Project documentation
```

## Screenshots
<table>
	<tr>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2019.34.37.png" width="250"/><br/>Screenshot 1</td>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2019.34.51.png" width="250"/><br/>Screenshot 2</td>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2022.34.10.png" width="250"/><br/>Screenshot 3</td>
	</tr>
	<tr>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2022.34.22.png" width="250"/><br/>Screenshot 4</td>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2022.34.27.png" width="250"/><br/>Screenshot 5</td>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2022.34.42.png" width="250"/><br/>Screenshot 6</td>
	</tr>
	<tr>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2022.34.50.png" width="250"/><br/>Screenshot 7</td>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2023.45.46.png" width="250"/><br/>Screenshot 8</td>
		<td><img src="screenshots/Screenshot%202025-07-18%20at%2023.45.55.png" width="250"/><br/>Screenshot 9</td>
	</tr>
</table>

<!-- Add more screenshots as needed -->

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

**Guidelines:**
- Write clear, descriptive commit messages
- Follow the existing code style and structure
- Ensure all tests pass before submitting

## License
This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Contact
- **Author:** Deshan
- **Email:** your.email@example.com
- **GitHub:** [Deshan555/eShift-Frontend](https://github.com/Deshan555/eShift-Frontend)
