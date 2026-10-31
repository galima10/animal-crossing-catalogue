import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function FishsPage(){
    return (
        <main>
            <ItemsList path={API_PATH.fish} params={{ page: 1 }} />
        </main>
    );
};
