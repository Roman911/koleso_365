interface ItemProps {
	language_id: number
	name: string
	name_ru: string
	status: number
	code: string
	sort_order: number
}

interface DeliverysProps extends ItemProps {
	deliverys_id: number
}

interface PaymentsProps extends ItemProps {
	payments_id: number
}

export interface OrdersParamProps {
	Deliverys: DeliverysProps[]
	Payments: PaymentsProps[]
}
