import './main.scss';
import * as d3 from 'd3';

(function () {

    const global = document.getElementById('scoped-plugin');

    const heading = document.createElement("h1");
    
    const text = 'Plugin Example';

    const textNode = document.createTextNode(text);
    heading.appendChild(textNode);

    global.appendChild(heading);


    const data = [
        {
            date: '1-May-12',
            close: 158.13
        },
        {
            date: '30-Apr-12',
            close: 153.98
        },
        {
            date: '28-Apr-12',
            close: 120.00
        },
        {
            date: '27-Apr-12',
            close: 57.00
        },
        {
            date: '26-Apr-12',
            close: 48.70
        },
        {
            date: '25-Apr-12',
            close: 29.00
        },
        {
            date: '24-Apr-12',
            close: 10.28
        },
        {
            date: '23-Apr-12',
            close: 6.70
        }
    ];

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var svg = d3.select(global).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
})();