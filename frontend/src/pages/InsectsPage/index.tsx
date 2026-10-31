import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function InsectsPage(){
    return (
        <main>
            <ItemsList path={API_PATH.insect} params={{ page: 1 }} />
        </main>
    );
};
