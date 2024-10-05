const apiUrl='https://jsonplaceholder.typicode.com/users';

const apiRequest=async(url,method='GET',body=null)=>{
    const options={
        method,
        headers:{
            'Content-Type':'application/json',
        },
    };

    if(body){
        options.body=JSON.stringify(body);
    }
    const response=await fetch(url,options);
    if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const fetchUsers= async()=>{
    return apiRequest(apiUrl);
};
export const createUsers = async(user)=>{
    return apiRequest(apiUrl,'POST', user);
};
export const updateUsers = async(user)=>{
    return apiRequest(`${apiUrl}/${user.id}`,'PUT', user);
};
export const deleteUsers = async(id)=>{
    return apiRequest(`${apiUrl}/${id}`,'DELETE');
};

