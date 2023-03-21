import { render, fireEvent, screen } from "@testing-library/react";
import Calculator from "../views/examples/Calculator.js";

//test block
describe('Test calculator function', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<Calculator />);
  });

  it('onSubmit is called when all fields are filled', async () => {
    // Arrange: get input fields for testing
    const monthlyFlight = screen.getByTestId('MonthlyFlight'); // no. flights monthly
    const monthlyWaterBill = screen.getByTestId('MonthlyWaterBill'); // monthly water bill
    const monthlyElectricBill = screen.getByTestId('MonthlyElectricBill'); // monthly electric bill
    const monthlyFoodWasted = screen.getByPlaceholderText(/100kg/i); //monthly food wasted
    const distanceDriven = screen.getByPlaceholderText(/100km/i);

    const submitButton = screen.getByRole('button', { // submit button
      name: /calculate my carbon footprint!/i
    })

    // Act: Set input fields, then submit
    fireEvent.change(monthlyFlight, {target: {value: 444}});
    fireEvent.change(monthlyWaterBill, {target: {value: 836}});
    fireEvent.change(monthlyElectricBill, {target: {value: 836}});
    fireEvent.change(monthlyFoodWasted, {target: {value: 836}});
    fireEvent.change(distanceDriven, {target: {value: 836}});

    fireEvent.click(submitButton);
    // Assert
    expect(onSubmit).toHaveBeenCalledTimes(1);
  })
});