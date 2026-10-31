import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function FurnituresPage(){
    return (
        <main>
            <ItemsList path={API_PATH.furniture} params={{ page: 1 }} />
        </main>
    );
};
