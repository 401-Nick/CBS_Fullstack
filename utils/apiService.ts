interface ApiResponse {
    success: boolean;
    message: string;
}

type UserFormData = {
    firstName: string;
    lastName: string;
    dob: string;
    ssn: string;
    confirmPassword: string;
    password: string;
    emailAddress: string;
    mobileNumber: string;
    physicalAddress: string;
};

export const registerUserAPI = async (formData: UserFormData): Promise<ApiResponse> => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorResponse: ApiResponse = { success: false, message: "There was a problem! Registration unsuccessful. Try again later." };
            return errorResponse;
        }

        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Registration failed: ${error}`);
    }
};
