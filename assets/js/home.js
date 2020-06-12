
{
/* **********************************************************************************/
//Add Task function 

let addTask=function(){
    let newform=$('#taskform');
    newform.submit(function(e){
        e.preventDefault();
    $.ajax(
        {
            type: 'post',
                url: '/addTask',
                data: newform.serialize(),
                success: function(data){        
                     displayonpage(data.data);
                }, error: function(error){
                    console.log(error.responseText);
                }

        }
    )
})};

/* **********************************************************************************/
//Show Tasks Function

let showTasks=function(){
    $.ajax(
        {
            type: 'get',
                url: '/showTasks',
                success:  function(data){
                    console.log(data.data);
                    for(let i of data.data)
                        {
                            console.log(i);
                             displayonpage(i);
                        }

                }, error: function(error){
                    console.log(error.responseText);
                }

        }
    )
};


/* **********************************************************************************/
//Display on page function

function displayonpage(data)
{
    console.log(data);
    $('#Taskscontainer').prepend(`<div id='taskbox'>
    <div id="discbox">
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${data._id}" id="defaultCheck1">
        <label class="form-check-label strikethrough" for="defaultCheck2">${data.description}</label>
    </div>
        <i class="far fa-calendar-alt"></i> ${data.date.split('T')[0]}

    </div>
    <div>
    <span>
        ${data.category}
        </span>
    </div>
</div>`);
}

/* **********************************************************************************/
//Delete Task function

 function deleteTasks(){
    $("#deltask").click(function(){
        var selectedTasks = new Array();
        var n = $(".form-check-input:checked").length;
        if (n > 0){
             jQuery(".form-check-input:checked").each(function(){
                selectedTasks.push($(this).val());
            });
        }
        $.ajax(
            {
                type: 'post',
                data:{
                    "del":selectedTasks
                },
                    url: '/delTasks',
                    success: async function(data){
                        console.log(data.data);
                        $('#Taskscontainer').empty();
                        for(let i of data.data)
                            {
                                console.log(i);
                                await displayonpage(i);
                            }
    
                    }, error: function(error){
                        console.log(error.responseText);
                    }
    
            }
        )
    });
}
/* **********************************************************************************/
//Delete All function

function deleteAll(){
    $("#delAll").click(function(){
        console.log('inside')
        $.ajax(
            {
                type: 'post',
                    url: '/delAll',
                    success: async function(){
                        $('#Taskscontainer').empty(); 
    
                    }, error: function(error){
                        console.log(error.responseText);
                    }
            }
        )
    });
}
/* **********************************************************************************/
//Function Calls
deleteAll();
deleteTasks();
showTasks();
addTask();

}