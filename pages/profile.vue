<template>
    <b-container-fluid>
        <b-row class='prof p-2'>
            <b-col md='4'>
                <div class="ava"></div>
            </b-col>
            <b-col md='8'>
                <h3>Robert Row</h3>
                <p><a href="mailto:robert@cherry.com">robert@cherry.com</a></p>
                <p><small>Time: <em>12.12.2019</em></small></p>
                <p><b>Valet ID: </b> <em>159216</em></p>
                <p><b>GEO: </b> <em>Air-1</em></p>
                <p><b>Rate: </b> <em>5/5</em></p>
                <p><b>Description: </b> <em>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ratione soluta est at totam blanditiis error, eveniet asperiores odio. Quis, laudantium eos. Veniam voluptates, nam recusandae quasi itaque eum labore.</em></p>
            </b-col>
        </b-row>
    </b-container-fluid>
</template>
<style scoped>
    .ava{
        height:20vw;
        width:20vw;
        background: url('https://images.pexels.com/photos/3031391/pexels-photo-3031391.jpeg') center no-repeat;
        background-size:100%;
        border-radius: 50%;
        border:2px solid gray;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    .prof{
        margin: 0 5vw;
    }
    @media(max-width: 768px){
        .ava{
            height: 22vw;
            width: 22vw;
        }
    }
    @media(max-width:576px){
        .ava{
            height: 30vw;
            width: 30vw;
        }
    }
</style>