import { useForm, Control, UseFormRegister, Controller } from "react-hook-form"
import classNames from "../../utils/classNames";
import { ReactNode, useState } from "react";
import { formatCNPJ } from "../../utils/formartar";
import * as Switch from "@radix-ui/react-switch";
import * as Check from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { inputClasses } from "../classes/inputs";
import * as Select from "@radix-ui/react-select";

type SwitchInput = {
    control: Control;
    name: string;
    // label?: boolean;
} & fieldInput

export type fieldInput = {
    name: string;
    control?: Control;
    register?: UseFormRegister<any>;
    maxLength?: number;
    disabled?: boolean;
    onChange?: Function;
    className?: string;
    placeholder?: string;
    label?: string;
    labelStyle?: string;
}

type rootProps = {
    children: ReactNode
    className?: string;
    label?: string;
    labelStyle?: string;
}

type labelProps = {
    children: ReactNode
    classNamee?: string;
}

type textAreaInput = {
    rows?: number;
    columns?: number;
} & fieldInput

export type selectInputOptions = {
    id?: number;
    name: string;
    valor?: string;
    control?: Control;
    register?: UseFormRegister<any>;
    dados?: any;
    className?: string
    change?: Function
} & fieldInput

export function FormDate(props: rootProps) {
    const { children, className } = props

    return (
        <form onSubmit={(e) => e.preventDefault()} className={classNames("flex flex-col space-y-2 border border-slate-300 p-4 rounded-md shadow-md", className)}>
            {children}
        </form>
    )
}

export function Title(labelProps: labelProps) {

    const { children, classNamee } = labelProps;

    return (
        <label className={classNamee}>{children}</label>
    )
}

export function Input(props: rootProps) {

    const { children, className } = props

    return (
        <>
            {children}
        </>
    )
}

function Field() {
    return (<></>)
}

function TextInput(props: fieldInput) {

    const { name, onChange, disabled, maxLength, register, className, placeholder, label, labelStyle } = props

    const Inputt = () => {
        return (
            <input type="text" name={name} onChange={e => onchange && onChange(e.target.value)} {...register && register(name)} disabled={disabled} maxLength={maxLength}
                className={classNames(className, "bg-white rounded-md w-full border-slate-300 text-[15px]")} placeholder={placeholder} />
        )
    }

    return (

        <Input className={className}>
            {label && !!label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <Inputt />
                </label>
            ) : (
                <Inputt />
            )}
        </Input>

    )
}


function TextArea(props: textAreaInput) {

    const { name, onChange, disabled, maxLength, register, className, placeholder, label, labelStyle, columns, rows } = props

    return (
        <textarea
            rows={rows ? rows : 3}
            cols={columns ? columns : 3}
            name={name}
            placeholder={placeholder}
            {...register && register(name)}
            className={classNames(className, inputclassName, "border rounded-md w-full placeholder:text-black placeholder:dark:text-white focus:outline-none border-gray-500 dark:border-0")}
            disabled={disabled}>
        </textarea>
    )
}

function CheckBox(props: fieldInput) {

    // const { control } = props;
    const { name, disabled, className, label, labelStyle, register, control } = props

    // const { field: { value: checkBoxValue, onChange: onChangeCheckBox } } = useController({ name: props.name, control, defaultValue: false });


    const Check1 = () => {
        return (
            <input type="checkbox" name={name} {...register && register(name)} disabled={disabled} className={classNames("p-4 rounded-full border-slate-300", className)} />
        )
    }

    const Check2 = () => {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Check.Root className="flex justify-center items-center size-[25px] appearance-none rounded bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px_black]"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    >
                        <Check.Indicator className="text-blue-600">
                            <CheckIcon />
                        </Check.Indicator>
                    </Check.Root>
                )}
            />

        )
    }
    return (
        <Input className={className}>
            {label && !!label ? (
                // <label className={classNames("", labelStyle)}> {label}
                //     <Check2 />
                // </label>
                <div className="flex items-center justify-center">
                    <Check2 />
                    <label
                        className="pl-[15px] text-[15px] leading-none text-black"
                        htmlFor="c1"
                    >
                        {label}
                    </label>
                </div>
            ) : (
                <Check2 />
            )}
        </Input>
    )
}

function SelectOption(props: selectInputOptions) {
    const [date, setDate] = useState<any[]>([]);

    const { name, dados, register, className, label, labelStyle } = props

    const Selectt = () => {
        return (
            <select {...register && register(name)} className={classNames('rounded-md p-2 w-full border-slate-300', className)}>
                <option className="">Selecione</option>
                {dados && dados.map((item : any) => (
                    <option key={item.id} className="text-black">{item.id} - {item.nome}</option>
                ))}
            </select>
        )
    }

    return (
        <Input className={className}>
            {label && !!label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <Selectt />
                </label>
            ) : (
                <Selectt />
            )}
        </Input>

    )
}

function OnlyNumber(props: fieldInput) {

    const { name, disabled, maxLength, register, placeholder, className, label, labelStyle } = props

    const Numberr = () => {
        return (
            <input type="number" name={name} {...register && register(name)} maxLength={maxLength} disabled={disabled} placeholder={placeholder} className={classNames("text-black rounded-md w-full border-slate-300", className)} />
        )
    }
    return (
        <Input className={className}>
            {label && !!label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <Numberr />
                </label>
            ) : (
                <Numberr />
            )}
        </Input>

    )
}

function InputCnpj(props: fieldInput) {
    const { name, label, labelStyle, className, register } = props

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCNPJ(event.target.value);
        event.target.value = formattedValue;
    };

    const CCnpj = () => {
        return (
            <input type="text" name={name} {...register && register(name)} onChange={handleInputChange} className={classNames("text-black rounded-md w-full border-slate-300", className)} />
        )
    }

    return (
        <Input className={className}>
            {label && !!label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <CCnpj />
                </label>
            ) : (
                <CCnpj />
            )}
        </Input>
    )
}

function SwitchIPT(props: SwitchInput) {

    const { name, control, label, labelStyle } = props
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex items-center">
                    {label ? (
                        <label
                            className="pr-[15px] text-[15px] leading-none text-black"
                            htmlFor="airplane-mode"
                        >
                            {label}
                        </label>
                    ) : null}

                    <Switch.Root
                        className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-400 shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-green-600"
                        id="airplane-mode"

                        checked={field.value}
                        onCheckedChange={field.onChange}
                    >
                        <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                </div>
            )}
        >
        </Controller>

    )
}

function SlctInput() {

    return (
        <Select.Root>

            <Select.Portal>
                <Select.Content>
                    <Select.ScrollUpButton />

                    <Select.Viewport>

                        <Select.Group>
                            <Select.Label></Select.Label>
                            
                        </Select.Group>

                    </Select.Viewport>
                    <Select.ScrollDownButton />
                    <Select.Arrow />
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

Input.Switch = SwitchIPT
Input.TextArea = TextArea
Input.Number = OnlyNumber
Input.Text = TextInput
Input.CheckBox = CheckBox
Input.Title = Title
Input.SelectOpt = SelectOption
Input.Cnpj = InputCnpj