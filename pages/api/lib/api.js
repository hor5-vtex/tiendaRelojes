export const sendFormData = async (data )=> fetch('/api/checkout',{
    method: "POST",
    body: JSON.stringify(data),
    headers:
    {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
    
})