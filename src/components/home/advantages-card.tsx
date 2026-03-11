import { IconBrandOpenSource, IconFreeRights } from "@tabler/icons-react";
import { Server } from "lucide-react";

const getComponent = (type: string) =>{

    switch(type){
        case "open-source":
            // return <IconBrandOpenSource size={150} strokeWidth={1.5} className="text-2xl font-bold inline-block text-6xl font-bold bg-gradient-to-r from-indigo-500 to-pink-600 bg-clip-text text-transparent"/>
            return <IconBrandOpenSource size={150} strokeWidth={1.5} className="text-[#6cbf9f]"/>
        case "self-hosted":
            return <Server size={150} strokeWidth={1.5} className="text-[#6cbf9f]"/>
        case "free":
            return <IconFreeRights size={150} strokeWidth={1.5} className="text-[#6cbf9f]"/>
    }
}

const getText = (type: string) =>{
    switch(type){
        case "open-source":
            return "Open-source"
        case "self-hosted":
            return "Self-hosted"
        default:
            return "100% free"
    }
}

export const AdventagesCard = ({type}: {type: "open-source" | "self-hosted" | "free"}) =>{
    return(
      <div className="mx-auto flex flex-col items-center justify-items-center pb-2 text-6xl font-bold bg-linear-to-r from-[#6cbf9f] to-[#68c7e7] bg-clip-text text-transparent">
        {
            getComponent(type)
        }
        <span>
            {
                getText(type)
            }
        </span>
      </div>
    )
};