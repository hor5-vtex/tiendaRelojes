export const actualizarStock = async (data )=> fetch('/api/stock',{
    method: "PUT",
    body: JSON.stringify(data),
    headers:
    {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
    
})