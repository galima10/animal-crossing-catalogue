import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function SeaCreaturesPage(){
    return (
        <main>
            <ItemsList path={API_PATH.seaCreature} params={{ page: 1 }} />
        </main>
    );
};
