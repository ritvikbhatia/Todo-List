
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
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    </div>
    <div>
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

showTasks();
addTask();



}