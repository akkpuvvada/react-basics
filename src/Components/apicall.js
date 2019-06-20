fetch(url)
             .then(response => response.json())
                // ...then we update the users state
                .then((findresponse) =>{
                    //This map function goes into api response mapping
                    tempRows = []
                    findresponse.map((data) => {
                        row = []
                        row = {
                            equipId: data.equipment,
                            timeStamp: data.time,
                            vechId: data.vehicle
                        }
                        tempRows.push(row)
                        images.push(data.images)
                    })
                    //--Till here
                }
                
            )


 axios({
      method: 'post',
      url: "",
      headers: {'Content-Type': 'application/json',},
      data: JSON.stringify(fieldValues)
    })
    .then((response)  => {
      console.log (response.data)    
          response.json()
          .then((findresponse) => {
          })})

          
          fetch (url, {
            method    : 'POST',
            headers   : headers,
            body      : JSON.stringify(body),
          })