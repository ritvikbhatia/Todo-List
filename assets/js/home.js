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
                    console.log(data);

                }, error: function(error){
                    console.log(error.responseText);
                }

        }
    )
})};
addTask();

}