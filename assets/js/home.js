
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
})};
function remaining()
{
    // data=Task.find({});
    // console.log(data);
}

function displayonpage(data)
{
    console.log(data);
    $('#Taskscontainer').append(`<div id='taskbox'>
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
remaining();
addTask();


}