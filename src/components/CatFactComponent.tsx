import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Div } from "@vkontakte/vkui";

const CatFactComponent: React.FC = () => {
    const [fact, setFact] = useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const fetchCatFact = async () => {
        try {
            const response = await axios.get('https://catfact.ninja/fact');
            setFact(response.data.fact);
            // Устанавливаем курсор после первого слова
            if (textAreaRef.current) {
                const firstSpaceIndex = response.data.fact.indexOf(' ');
                if (firstSpaceIndex !== -1) {
                    textAreaRef.current.focus();
                    textAreaRef.current.setSelectionRange(firstSpaceIndex + 1, firstSpaceIndex + 1);
                }
            }
        } catch (error) {
            console.error('Ошибка при получении факта о кошке:', error);
        }
    };
    useEffect(() => {
        if (fact && textAreaRef.current) {
            const firstSpaceIndex = fact.indexOf(' ');
            if (firstSpaceIndex !== -1) {
                textAreaRef.current.focus();
                textAreaRef.current.setSelectionRange(firstSpaceIndex + 1, firstSpaceIndex + 1);
            }
        }
    }, [fact]);
    return (
        <Div>
            <textarea
                value={fact}
                onChange={(e) => setFact(e.target.value)}
                placeholder="Тут будет факт о кошках"
                ref={textAreaRef}
            />
            <Button size="l" style={{ marginTop: 15 }} onClick={fetchCatFact}>
                Получить факт о кошке
            </Button>
        </Div>
    );
};

export default CatFactComponent;