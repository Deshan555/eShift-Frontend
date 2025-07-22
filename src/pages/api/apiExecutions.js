import axios from "axios";
import apiConfigurations from "./apiConfigurations";

const apiExecutions = {
  getAllAdmins: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Admin`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAdminById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Admin/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createAdmin: async (adminData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Admin`, adminData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateAdmin: async (id, adminData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Admin/${id}`, adminData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteAdmin: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Admin/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  adminLogin: async (loginData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Admin/login`, loginData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAllBranches: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Branch`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getBranchById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Branch/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createBranch: async (branchData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Branch`, branchData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateBranch: async (id, branchData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Branch/${id}`, branchData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteBranch: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Branch/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },

  // Assistants
  getAllAssistants: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Assistant`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAssistantById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Assistant/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createAssistant: async (assistantData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Assistant`, assistantData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateAssistant: async (id, assistantData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Assistant/${id}`, assistantData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteAssistant: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Assistant/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAllCities: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/City`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getCityById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/City/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createCity: async (cityData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/City`, cityData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateCity: async (id, cityData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/City/${id}`, cityData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteCity: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/City/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAllJobs: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getJobById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createJob: async (jobData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Job`, jobData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateJob: async (id, jobData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Job/${id}`, jobData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteJob: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Job/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createJobStop: async (jobStopData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/JobStop`, jobStopData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAllJobStops: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/JobStop`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getJobStopById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/JobStop/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateJobStop: async (id, jobStopData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/JobStop/${id}`, jobStopData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  // Lorry (Vehicle) Endpoints
  getAllLorries: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Lorry`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getLorryById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Lorry/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createLorry: async (lorryData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Lorry`, lorryData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateLorry: async (id, lorryData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Lorry/${id}`, lorryData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteLorry: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Lorry/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },

  // Driver Endpoints
  getAllDrivers: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Driver`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getDriverById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Driver/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createDriver: async (driverData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Driver`, driverData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateDriver: async (id, driverData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Driver/${id}`, driverData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteDriver: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Driver/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  // Customer Endpoints
  getAllCustomers: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Customer`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getCustomerById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Customer/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Customer`, customerData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateCustomer: async (id, customerData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Customer/${id}`, customerData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  deleteCustomer: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Customer/${id}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getJobStopsByJobId: async (jobId) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/JobStop/by-job/${jobId}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getAvailableResources: async (data) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Trip/available-resources`, data);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createTrip: async (tripData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Trip`, tripData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateTrip: async (id, tripData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Trip/${id}`, tripData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  // http://localhost:5000/api/Load
  getAllLoads: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Load`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createLoad: async (loadData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Load`, loadData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  // http://localhost:5000/api/Load/1" - update load by id
  updateLoad: async (id, loadData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Load/${id}`, loadData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },

  // http://localhost:5000/api/Job/details/15
  getJobDetailsOverall: async (jobId) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job/details/${jobId}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getJobsByCustomers: async (customerId) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job/by-user/${customerId}`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  createNewCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Customer`, customerData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  updateCustomerById: async (id, customerData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Customer/${id}`, customerData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  loginCustomer: async (loginData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Customer/login`, loginData);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },
  getDashboardSummary: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Dashboard/summary`);
      return response;
    } catch (error) {
      return error.response ? error.response.data :
        error.request ? error.request.data :
          console.error('Error setting up the request:', error.message);
    }
  },

}

export default apiExecutions;