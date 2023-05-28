
function search_book()
{
    var search = document.getElementById("searchbar").value.toLowerCase();
    var container = document.getElementById("content");
    container.innerHTML="";
    fetch("https://openlibrary.org/search.json?q="+search)
    .then(alert("It might take some time to load the data. \nSorry for the inconvinience! \nPlease wait..."))
    .then(a=>a.json())
    .then(response=>{
        for(var i=0;i<response.docs.length;i++)
        {
            container.innerHTML=container.innerHTML+
            '<div class="book">'+
                '<div class="title">'+
                    response.docs[i].title+
                '</div>'+
                '<div class="info">'+
                    '<img src="http://covers.openlibrary.org/b/isbn/'+response.docs[i].isbn[0]+'-M.jpg"><br>'+  
                    '<div>'+
                        '<span style="font-weight:500; color:rgb(122, 72, 15)">'+
                            'Author: '+
                        '</span>'+
                        response.docs[i].author_name[0] +'<br>'+
                        /*'<span style="font-weight:500; color:rgb(122, 72, 15)">'+
                            'Subject: '+
                        '</span>'+
                        response.docs[i].subject[0] +'<br>'+*/
                        '<span style="font-weight:500; color:rgb(122, 72, 15)">'+
                            'No. of pages: '+
                        '</span>'+
                        response.docs[i].number_of_pages_median +'<br>'+
                        '<span style="font-weight:500; color:rgb(122, 72, 15)">'+
                            'First publish year: '+
                        '</span>'+
                        response.docs[i].first_publish_year +'<br><br>'+
                        '<button style="background-color:rgb(255, 195, 104); width:120px; height:20px; border:none; border-radius:10px;" onclick="display(\''+response.docs[i].key+'\')">view more</button>'
                    '</div>'+
                '</div>'+
            '</div>';
        }
    })

}

function display(url_spec)
{
    var text;
    fetch("https://openlibrary.org"+url_spec+".json")
    .then(a=>a.json())
    .then(response=>{
        if(typeof response.description!='undefined')
        { 
            if(typeof response.description=='string')
            {
                alert(response.description);
            }
            else if(typeof response.description.value!='undefined')
            {
                if(typeof response.description.value=='string')
                {
                    alert(response.description.value);
                }
            }
        }
        else
        {
            alert("description not available");
        }
    })
}

