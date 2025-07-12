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
      console.error('getAllAdmins error:', error);
      throw error;
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
      console.error('getAdminById error:', error);
      throw error;
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
      console.error('createAdmin error:', error);
      throw error;
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
      console.error('updateAdmin error:', error);
      throw error;
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
      console.error('deleteAdmin error:', error);
      throw error;
    }
  },
  adminLogin: async (loginData) => {
    try {
      const response = await axios.post(`${apiConfigurations.baseUrl}/api/Admin/login`, loginData);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`Failed to login admin: ${response.message}`);
      }
    } catch (error) {
      console.error('adminLogin error:', error);
      throw error;
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
        console.error('getAllBranches error:', error);
        throw error;
        }
    },
}

export default apiExecutions;