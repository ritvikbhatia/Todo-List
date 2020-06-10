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
                    let display=displayonpage(data);

                }, error: function(error){
                    console.log(error.responseText);
                }

        }
    )
})};
function displayonpage(data)
{
    console.log(data);
    $('#Taskscontainer').append(`<div id='taskbox'>
    <div>
        <h3>
            ${data.data.description}
        </h3>
            ${data.data.date}

    </div>
    <div>
        ${data.data.category}
    </div>
</div>`);
}
addTask();

}