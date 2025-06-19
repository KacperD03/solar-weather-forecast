# Solar Weather Forecast

Aplikacja do wyświetlania 7-dniowej prognozy pogody oraz oszacowania produkcji energii z instalacji fotowoltaicznej. Aplikacja korzysta z zewnętrznego API (Open Meteo) do pobierania danych pogodowych i oblicza szacowaną ilość energii w kWh, którą można wygenerować w danym okresie.

## Technologie

- **Frontend**: Next.js
- **Backend**: Node.js (Express)
- **API**: Open Meteo
- **Baza Danych**: Brak (wszystkie dane pochodzą z API)

## Funkcje

1. **Prognoza pogody**:
   - Wyświetlanie 7-dniowej prognozy pogody z minimalną i maksymalną temperaturą.
   - Pokazywanie szacowanej produkcji energii z instalacji fotowoltaicznej (w kWh) na podstawie czasu ekspozycji na słońce.
   - Wizualizacja danych pogodowych w tabeli z codziennymi informacjami.

2. **Podsumowanie tygodnia**:
   - Wyświetlanie średniego ciśnienia w ciągu tygodnia.
   - Obliczenie średniego czasu ekspozycji na słońce.
   - Wyświetlanie skrajnych temperatur tygodnia.
   - Krótkie podsumowanie przewidywanych warunków pogodowych (z opadami, bez opadów).

## Uruchamianie

Uruchom serwer backendowy:
```bash
   node server.js
```

Backend będzie dostępny pod adresem: http://localhost:5000.

Uruchom aplikację frontendową:

```bash
   npm run dev
```

Frontend będzie dostępny pod adresem: http://localhost:3000.

![alt text](image.png)