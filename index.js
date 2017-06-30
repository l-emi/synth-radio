$(document).ready(function () {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('audioElement');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    //bind analyser to media element source
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    //the chart
    var frequencyData = new Uint8Array(80);

    var svgHeight = screen.height;
    var svgWidth = screen.width;
    var barPadding = '5';

    function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

var svg = createSvg('body', svgHeight, svgWidth);

svg.selectAll('rect')
    .data(frequencyData)
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
        return i * (svgWidth / frequencyData.length);
      })
    .attr('width', svgWidth / frequencyData.length - barPadding);


//update chart with frequency data
function renderChart() {
    requestAnimationFrame(renderChart);
    
    analyser.getByteFrequencyData(frequencyData);
    
    svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
            return svgHeight - d;
    })
    .attr('height', function(d) {
        return d;
    })
    .attr('fill', function(d) {
        return 'rgb(' + d + ',0,' + d + ')';
    });
}

renderChart();
    
});