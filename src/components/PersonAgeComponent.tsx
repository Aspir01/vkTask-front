import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Div, Text } from "@vkontakte/vkui";
import * as yup from 'yup';
import { useState } from 'react';

interface IFormInput {
    name: string;
}

const schema = yup.object({
    name: yup.string().matches(/^[A-Za-z]+$/, 'Введите корректное имя').required(),
}).required();

const PersonAgeComponent: React.FC = () => {
    const [age, setAge] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const [lastQueriedName, setLastQueriedName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchAge = async (name: string) => {
        if (name === lastQueriedName) {
            // Если имя не изменилось, не делаем запрос
            return;
        }

        setLoading(true); // Показываем индикатор загрузки
        const controller = new AbortController();
        const signal = controller.signal;
        setLastQueriedName(name);

        try {
            setTimeout(async () => {
                if (signal.aborted) {
                    // Если запрос отменен, прекращаем выполнение
                    return;
                }
                const response = await axios.get(`https://api.agify.io/?name=${name}, ${signal}`);
                setAge(response.data.age);
                setLoading(false); // Скрываем индикатор загрузки
            }, 3000);
        } catch (error) {
            setLoading(false); // Скрываем индикатор загрузки
            if (axios.isCancel(error)) {
                console.log('Запрос отменен:', error.message);
            } else {
                console.error('Ошибка получения возраста:', error);
            }
        }

        return () => {
            controller.abort();
        };
    };

    const onSubmit: SubmitHandler<IFormInput> = data => {
        fetchAge(data.name);
        reset();
    };

    return (
        <Div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder="Введите ваше имя" />
                {errors.name && <Text>{errors.name.message}</Text>}
                <Button size="l" style={{ marginBottom: 15 }} type="submit">Узнать возраст</Button>
            </form>
            {loading && <Text>Загрузка...</Text>}
            {age && loading === false && <Text>Ваш возраст: {age}</Text>}
        </Div>
    );
};

export default PersonAgeComponent;