//Найти продукты, которые были проданы более чем 1000 раз и отсортировать их по убыванию количества продаж.
SELECT Products.ProductName, SUM(OrderDetails.Quantity) AS TotalQuantitySold
FROM Products
INNER JOIN OrderDetails ON Products.ProductID = OrderDetails.ProductID
GROUP BY Products.ProductName
HAVING SUM(OrderDetails.Quantity) > 1000
ORDER BY TotalQuantitySold DESC;


//Найти клиентов, у которых были заказы на сумму более $10,000 за последний год и отсортировать их по убыванию суммы заказов.
//sql

SELECT Customers.CompanyName, SUM(Orders.TotalPrice) AS TotalAmountSpent
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE Orders.OrderDate BETWEEN '1995-01-01' AND '1995-12-31'
GROUP BY Customers.CompanyName
HAVING SUM(Orders.TotalPrice) > 10000
ORDER BY TotalAmountSpent DESC;


//Найти продукты, которые были заказаны в количестве более чем 50 штук, но не были проданы, и отсортировать их по возрастанию стоимости.

SELECT Products.ProductName, Products.UnitPrice, SUM(OrderDetails.Quantity) AS TotalQuantityOrdered
FROM Products
INNER JOIN OrderDetails ON Products.ProductID = OrderDetails.ProductID
LEFT JOIN Orders ON OrderDetails.OrderID = Orders.OrderID
WHERE OrderDetails.Quantity > 50 AND Orders.OrderDate IS NULL
GROUP BY Products.ProductName, Products.UnitPrice
ORDER BY Products.UnitPrice ASC;


//Найти среднее время доставки заказов для каждой страны, где были заказы, и отсортировать страны по возрастанию времени доставки.

SELECT Customers.Country, AVG(DATEDIFF(Orders.ShippedDate, Orders.OrderDate)) AS AvgDaysToDelivery
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
GROUP BY Customers.Country
ORDER BY AvgDaysToDelivery ASC;

// Найти клиентов, которые делали заказы в декабре каждого года, начиная с 1996 года, и отсортировать их по убыванию количества заказов.

SELECT Customers.CompanyName, COUNT(Orders.OrderID) AS TotalOrdersPlaced
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE MONTH(Orders.OrderDate) = 12 AND YEAR(Orders.OrderDate) >= 1996
GROUP BY Customers.CompanyName
ORDER BY TotalOrdersPlaced DESC;


// Найти продукты, которые не были заказаны в течение последнего года, и удалить их из базы данных.


DELETE FROM Products
WHERE ProductID NOT IN (
  SELECT DISTINCT ProductID
  FROM OrderDetails
  WHERE OrderID IN (
    SELECT OrderID
    FROM Orders
    WHERE OrderDate >= DATEADD(year, -1, GETDATE())
  )
);
