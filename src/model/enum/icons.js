
import { CircleCheck } from '@/assests/icons/circleCheck';
import { CircleXmark } from '@/assests/icons/circleXmark';
import { MagnifyingGlass } from '@/assests/icons/magnifyingGlass';
import { Pencil } from '@/assests/icons/pencil';
import { Trash } from '@/assests/icons/trash';
import { UpArrow } from '@/assests/icons/upArrow';

const Icons = class {
    static getComponent(value, resource) {
        switch (value) {

            case Icons.UP_ARROW:
                return <UpArrow resource={resource} />;
            case Icons.TRASH:
                return <Trash resource={resource} />;
            case Icons.PENCIL:
                return <Pencil resource={resource} />;
            case Icons.CIRCLE_CHECK:
                return <CircleCheck resource={resource} />;
            case Icons.CIRCLE_XMARK:
                return <CircleXmark resource={resource} />;
            case Icons.MAGNIFYING_GLASS:
                return <MagnifyingGlass resource={resource} />;
            default:
                return null;
        }
    }
};

Icons.UP_ARROW = 1;
Icons.TRASH = 2;
Icons.PENCIL = 3;
Icons.CIRCLE_CHECK = 4;
Icons.CIRCLE_XMARK = 5;
Icons.MAGNIFYING_GLASS = 6;

export default Icons;
