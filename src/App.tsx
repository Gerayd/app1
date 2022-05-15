import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { IOption, IShippingFields } from './app.interface'
import ReactSelect from 'react-select'

export const options: IOption[] = [
	{
		value: 'russia',
		label: 'Russia',
	},
	{
		value: 'china',
		label: 'China',
	},
	{
		value: 'usa',
		label: 'USA',
	},
	{
		value: 'new-zeeland',
		label: 'New Zeeland',
	},
]

export const getValue = (value: string) =>
	value ? options.find(option => option.value === value) : ''

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
		control,
	} = useForm<IShippingFields>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IShippingFields> = data => {
		alert(`Your country ${data.address.country}`)
		reset()
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('name', {
						required: 'Name is require field!',
					})}
					placeholder='Name'
				/>
				{errors?.name && (
					<div style={{ color: 'red' }}>{errors.name.message}</div>
				)}

				<input
					{...register('email', {
						required: 'Email is require field!',
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Please enter valid email!',
						},
					})}
					placeholder='Email'
				/>
				{errors?.email && (
					<div style={{ color: 'red' }}>{errors.email.message}</div>
				)}

				<Controller
					control={control}
					name='address.country'
					rules={{
						required: 'Country is required!',
					}}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<div>
							<ReactSelect
								placeholder='Countries'
								options={options}
								value={getValue(value)}
								onChange={newValue => onChange((newValue as IOption).value)}
							/>
							{error && <div style={{ color: 'red' }}>{error.message}</div>}
						</div>
					)}
				/>

				<div>
					<button>Send</button>
				</div>
			</form>
			<div>
				<button
					onClick={() => {
						setValue('name', 'Max')
						setValue('email', 'test@test.ru')
					}}
				>
					Fill data
				</button>
			</div>
		</div>
	)
}

export default App
