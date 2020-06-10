
{
    
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
                    console.log(data.data);        
                    displayonpage(data.data);

                }, error: function(error){
                    console.log(error.responseText);
                }

        }
    )
})};
let showTasks=function(){
    $.ajax(
        {
            type: 'get',
                url: '/showTasks',
                success: function(data){
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



function displayonpage(data)
{
    console.log(data);
    $('#Taskscontainer').append(`<div id='taskbox'>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${data._id}" id="defaultCheck1">
    </div>
    <div id="discbox">
        <h3>
            ${data.description}
        </h3>
        <i class="far fa-calendar-alt"></i> ${data.date.split('T')[0]}

    </div>
    <div>
    <span>
        ${data.category}
        </span>
    </div>
</div>`);
}

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
                    success: function(data){
                        console.log(data.data);
                        $('#Taskscontainer').empty();
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
    });
}
deleteTasks();

showTasks();
addTask();



}