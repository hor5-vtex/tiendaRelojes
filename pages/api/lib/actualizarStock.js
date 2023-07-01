export const actualizarStock = async (data)=> fetch('/api/stock',{
    method: "POST",
    body: JSON.stringify(data),
    headers:
    {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
    
})