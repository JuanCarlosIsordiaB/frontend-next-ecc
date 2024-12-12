import { formatCurrency } from "../../utils";

type AmountProps = {
    amount: number;
    label: string;
}

export default function Amount({label, amount}: AmountProps) {
    return (
        <div className="flex justify-between">
            <dt>{label}:</dt>
            <dd>{formatCurrency(amount)}</dd>
        </div>
    );

}