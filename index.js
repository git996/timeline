
//WorldIndex Script
; var Dashboard = (function (window, document, undefined) {

    
    
  
    var start = performance.now();
    var parseDate = d3.time.format("%m/%d/%Y").parse;
    var parsehours = d3.time.format("%H:%M:%S").parse;
   
    d3.csv("timesheet.csv", function (error, data) {
        if (error) { alert("Data Error! Please Reload."); return; };
        console.log("Data Loaded Successfully");
        var bisData = data;
        console.log(bisData);

       

      //  var n = new Date(parseh(bisData[0]["Grand Total"]));

       // console.log(n.getDate());

        bisData.forEach(function (d) {
          

            var x0 = new Date(parsehours(d["Total"]));
            var x = x0.getHours() +"."+x0.getMinutes();

            var fin = d["Total"] = x;
            return fin;

        });


       

        //function parses the date from csv and converts to milliseconds to display activity by descending date.
     
        //nesting
        date = d3.nest()
               .key(function (d) { return parseDate(d["Date"])})
             
               .entries(bisData);
        
        console.log(date);
       
        
        hours = d3.nest()
               .key(function (d) { return (d["Total"]) })
            
               .entries(bisData);

        console.log(hours);
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        

   
        chartContainer = d3.select("#main-content").append("div").attr("class", "ui card").attr("id", "chart1");

        var totalhours = 0;
            for (t = 0; t < hours.length; t++) {

                totalhours = totalhours + (hours[t].key * (hours[t].values.length))
                //console.log(totalhours + ", " + hours[t].key * (hours[t].values.length));
            }
      
            var av = Math.round((totalhours / date.length) * 100) / 100
            var average = [];
            var startTime =[];
            var finTime =[];
            var hours1 = [];
            var hours2 = [];
            for (j = 0; j < date.length; j++) {
                     
                hours1[j] = date[j].values[0]["Total"];
                startTime[j] = date[j].values[0]["Start"];
                finTime[j] = date[j].values[0]["Finish"];
                average[j] = av;
                if (date[j].values.length == 2) {
                    hours2[j] = date[j].values[1]["Total"];
                }
                else {
                    hours2[j] = null;
                }                                                                
            }
            hours1.unshift("Primary Hours");
            startTime.unshift("Start Time");
            console.log(startTime);
            finTime.unshift("Finish Time");
            console.log(finTime);
            average.unshift("Average");
            console.log(hours1);
            console.log(average);
            hours2.unshift("Secondary Hours");
            console.log(hours2);

            //dates and arrays
            var dates = [];
            for (i = 0; i < date.length; i++) {
                var nn = new Date((date[i].key));
                dates[i] = month[nn.getMonth()]+' '+ nn.getDate()  ;
    
            }              
            console.log(dates);
        

       

        function Chart() {
        

            var chart = c3.generate({
                bindto: '#chart1',
                data: {

                    columns: [
                        hours1,
                        hours2,
                        average,
                      

                    ],
                    
                        
                        
                    types: {
                        'Primary Hours': 'bar',
                        'Secondary Hours': 'bar',
                        'Average': 'spline',
                    },
                    colors: {
                        'Primary Hours': 'orange',
                        'Secondary Hours': 'purple',
                        'Average': 'teal'
                    },


                    groups: [[hours1, hours2]]
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: dates,
                        label: 'Dates',
                    },
                    y: {
                        label: 'Hours Worked',
                    }

                },

                bar: {
                    width: {
                        ratio: 0.4,
                    }
                },
                zoom: {
                    enabled: true
                },
            });
            chart.zoom([40, 55]);
            jQuery("#mybtn").mouseover(function () {
                chart.transform('area', 'Hours ');

            });
            jQuery("#mybtn").mouseout(function () {
                chart.transform('bar', 'Hours ');

            });
        }
        
       
        
       
        Chart();

        var statmodule = d3.select("#main-content").append("div").attr("id", "stat-module").attr("class","ui card").style("position", "relative").style("height", "15%").style("width","15%");
           

        var totallabel = statmodule.append("div").attr("class", "ui raised segment").style("max-width", "0px").append("a").attr("class", "label").html("Total Hours   ").attr("class", "ui orange ribbon label").style("width", "105%")
           .append("div").attr("class", "ui statistic")
        .append("div").attr("class", "value").html(Math.round(totalhours * 100) / 100);

        var average = statmodule.append("div").attr("class", "ui raised segment").style("max-width", "0px").append("a").attr("class", "label").html("Average per day   ").attr("class", "ui teal ribbon label").style("width", "105%")
           .append("div").attr("class", "ui statistic")
    .append("div").attr("class", "value").html(Math.round((totalhours / date.length) * 100) / 100) + "";

      

       

        $("#mySteps").hide();
        $("#stat-module").hide();

        $("#tglStep").click(function () {
            $("#mySteps").transition('slide down');
        })
        $("").click(function () {
            $("#chart1").transition('bounce');
        })

        $("#tglStat").click(function () {
          
            d3.select("#chart1").style("min-width", "1400px");
            $("#stat-module").transition('horizontal flip');
           
        })
      
        $("#step1").click(function () {
             $('.ui.basic.modal')
      .modal('show')
            ;
        });

        //
        var end = performance.now();
        console.log("Total Execution Time: " + (end - start) + " milliseconds");



    });


})(window, document);
