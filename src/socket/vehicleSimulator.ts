import { Server } from "socket.io";


interface Vehicle {

    _id: string;

    vehicleNumber: string;

    driver: string;

    speed: number;

    fuel: number;

    status: "Active" | "Idle" | "Offline";

    latitude: number;

    longitude: number;

}



const vehicles: Vehicle[] = [

    {
        _id:"1",
        vehicleNumber:"UP14 AB 1234",
        driver:"Rahul Sharma",
        speed:60,
        fuel:75,
        status:"Active",
        latitude:28.6139,
        longitude:77.2090
    },


    {
        _id:"2",
        vehicleNumber:"DL01 XY 5678",
        driver:"Amit Kumar",
        speed:45,
        fuel:60,
        status:"Active",
        latitude:28.7041,
        longitude:77.1025
    },


    {
        _id:"3",
        vehicleNumber:"HR26 AB 9999",
        driver:"Suresh Singh",
        speed:0,
        fuel:40,
        status:"Idle",
        latitude:28.4595,
        longitude:77.0266
    }


];





export const startVehicleSimulator = (
    io:Server
)=>{


    console.log(
        "Vehicle Simulator Started"
    );



    setInterval(()=>{


        vehicles.forEach(
            (vehicle)=>{


                if(vehicle.status==="Active"){


                    vehicle.latitude +=
                    (Math.random()-0.5)/500;



                    vehicle.longitude +=
                    (Math.random()-0.5)/500;



                    vehicle.speed =
                    Math.floor(
                        Math.random()*80
                    );


                    vehicle.fuel =
                    Math.max(
                        vehicle.fuel-0.1,
                        0
                    );


                }



            }
        );



        io.emit(
            "vehicleUpdated",
            vehicles
        );



        console.log(
            "Vehicle locations updated"
        );


    },5000);



};