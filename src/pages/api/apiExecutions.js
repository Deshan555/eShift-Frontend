import axios from "axios";
import apiConfigurations from "./apiConfigurations";

const apiExecutions = {
  getAllAdmins: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Admin`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch admins: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllAdmins error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getAdminById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Admin/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch admin by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAdminById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createAdmin: async (adminData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Admin`, adminData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create admin: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createAdmin error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateAdmin: async (id, adminData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Admin/${id}`, adminData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update admin: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateAdmin error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteAdmin: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Admin/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete admin: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteAdmin error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
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
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch branches: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllBranches error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getBranchById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Branch/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch branch by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getBranchById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createBranch: async (branchData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Branch`, branchData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create branch: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createBranch error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateBranch: async (id, branchData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Branch/${id}`, branchData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update branch: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateBranch error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteBranch: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Branch/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete branch: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteBranch error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

  // Assistants
  getAllAssistants: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Assistant`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch assistants: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllAssistants error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getAssistantById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Assistant/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch assistant by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAssistantById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createAssistant: async (assistantData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Assistant`, assistantData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create assistant: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createAssistant error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateAssistant: async (id, assistantData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Assistant/${id}`, assistantData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update assistant: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateAssistant error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteAssistant: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Assistant/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete assistant: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteAssistant error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getAllCities: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/City`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch cities: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllCities error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getCityById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/City/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch city by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getCityById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createCity: async (cityData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/City`, cityData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create city: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createCity error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateCity: async (id, cityData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/City/${id}`, cityData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update city: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateCity error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteCity: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/City/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete city: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteCity error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getAllJobs: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch jobs: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllJobs error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getJobById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch job: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getJobById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createJob: async (jobData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Job`, jobData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create job: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createJob error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateJob: async (id, jobData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Job/${id}`, jobData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update job: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateJob error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteJob: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Job/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete job: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteJob error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createJobStop: async (jobStopData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/JobStop`, jobStopData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create job stop: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createJobStop error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getAllJobStops: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/JobStop`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch job stops: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllJobStops error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getJobStopById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/JobStop/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch job stop by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getJobStopById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateJobStop: async (id, jobStopData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/JobStop/${id}`, jobStopData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update job stop: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateJobStop error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  // Lorry (Vehicle) Endpoints
  getAllLorries: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Lorry`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch lorries: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllLorries error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getLorryById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Lorry/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch lorry: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getLorryById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createLorry: async (lorryData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Lorry`, lorryData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create lorry: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createLorry error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateLorry: async (id, lorryData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Lorry/${id}`, lorryData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update lorry: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateLorry error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteLorry: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Lorry/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete lorry: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteLorry error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

  // Driver Endpoints
  getAllDrivers: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Driver`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch drivers: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllDrivers error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getDriverById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Driver/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch driver: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getDriverById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createDriver: async (driverData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Driver`, driverData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create driver: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createDriver error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateDriver: async (id, driverData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Driver/${id}`, driverData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update driver: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateDriver error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteDriver: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Driver/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete driver: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteDriver error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  // Customer Endpoints
  getAllCustomers: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Customer`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch customers: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllCustomers error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getCustomerById: async (id) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Customer/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch customer by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getCustomerById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Customer`, customerData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createCustomer error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateCustomer: async (id, customerData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Customer/${id}`, customerData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateCustomer error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  deleteCustomer: async (id) => {
    try {
      const response = await axios.delete(`${apiConfigurations.baseUrl}/api/Customer/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to delete customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'deleteCustomer error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getJobStopsByJobId: async (jobId) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/JobStop/by-job/${jobId}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch job by id: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getJobById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getAvailableResources: async (data) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Trip/available-resources`, data);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch available resources: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAvailableResources error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createTrip: async (tripData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Trip`, tripData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create trip: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createTrip error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateTrip: async (id, tripData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Trip/${id}`, tripData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update trip: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateTrip error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  // http://localhost:5000/api/Load
  getAllLoads: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Load`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch loads: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getAllLoads error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createLoad: async (loadData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Load`, loadData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create load: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createLoad error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  // http://localhost:5000/api/Load/1" - update load by id
  updateLoad: async (id, loadData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Load/${id}`, loadData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update load: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateLoad error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

  // http://localhost:5000/api/Job/details/15
  getJobDetailsOverall: async (jobId) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job/details/${jobId}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch job details: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getJobDetails error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getJobsByCustomers: async (customerId) => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Job/by-user/${customerId}`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch jobs by customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getJobsByCustomers error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  createNewCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Customer`, customerData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to create customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'createNewCustomer error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  updateCustomerById: async (id, customerData) => {
    try {
      const response = await axios.put(`${apiConfigurations.baseUrl}/api/Customer/${id}`, customerData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to update customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'updateCustomerById error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  loginCustomer: async (loginData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Customer/login`, loginData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to login customer: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'loginCustomer error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },
  getDashboardSummary: async () => {
    try {
      const response = await axios.get(`${apiConfigurations.baseUrl}/api/Dashboard/summary`);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch dashboard summary: ${response.message}`);
      }
    } catch (error) {
      let errorMsg = 'getDashboardSummary error:';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMsg += ' ' + error.response.data;
        } else if (error.response.data.message) {
          errorMsg += ' ' + error.response.data.message;
        } else {
          errorMsg += ' ' + JSON.stringify(error.response.data);
        }
      } else if (error.message) {
        errorMsg += ' ' + error.message;
      }
      console.error(errorMsg, error);
      throw new Error(errorMsg);
    }
  },

}

export default apiExecutions;