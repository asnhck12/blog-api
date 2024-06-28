export const fetchWithAuth = async (url, options = {}) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    // Set up headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Combine headers with other options
    const fetchOptions = {
        ...options,
        headers,
    };

    // Perform the fetch request
    const response = await fetch(url, fetchOptions);

    // Check for unauthorized status (401) and handle it if necessary
    if (response.status === 401) {
        // For example, redirect to login page or show a message
        console.error('Unauthorized: Token may have expired.');
        // You might want to handle token refresh or redirect to login here
    }

    return response;
};
