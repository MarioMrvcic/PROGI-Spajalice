package com.spajalice.ProjektSpajalice;

import com.spajalice.ProjektSpajalice.Model.Event;
import com.spajalice.ProjektSpajalice.Model.User;
import com.spajalice.ProjektSpajalice.Repository.EventRepository;
import com.spajalice.ProjektSpajalice.Repository.UserRepository;
import com.spajalice.ProjektSpajalice.Services.EventService;
import com.spajalice.ProjektSpajalice.Services.UserService;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.mockito.Mock;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class ProjektSpajaliceApplicationTests {

	@Test
	public void testLoginGoodCredentials(){

		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();

		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		driver.get("http://localhost:3000/login");

		WebElement element = driver.findElement(By.name("Email"));
		element.sendKeys("admin@gmail.com");

		element = driver.findElement(By.name("password"));
		element.sendKeys("Admin123");

		driver.findElement(By.cssSelector("input[type='submit']")).click();

		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1));
		wait.until(ExpectedConditions.urlToBe("http://localhost:3000/"));
		String redirectUrl = driver.getCurrentUrl();

		boolean success = redirectUrl.equals("http://localhost:3000/");
		assertEquals(true, success);

		driver.quit();
	}

	@Test
	public void testLoginBadCredentials(){

		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();

		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		driver.get("http://localhost:3000/login");

		WebElement element = driver.findElement(By.name("Email"));
		element.sendKeys("random");

		element = driver.findElement(By.name("password"));
		element.sendKeys("random");

		driver.findElement(By.cssSelector("input[type='submit']")).click();
		String redirectUrl = driver.getCurrentUrl();

		boolean success = redirectUrl.equals("http://localhost:3000/");
		assertEquals(false, success);

		driver.quit();
	}

	@Test
	public void testCreateEvent() throws InterruptedException {

		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.get("http://localhost:3000/login");
		WebElement element = driver.findElement(By.name("Email"));
		element.sendKeys("admin@gmail.com");
		element = driver.findElement(By.name("password"));
		element.sendKeys("Admin123");
		driver.findElement(By.cssSelector("input[type='submit']")).click();
		Thread.sleep(1000);
		WebElement menuDiv = driver.findElement(By.className("menu"));
		menuDiv.click();
		WebElement createEvent=driver.findElement(By.xpath(".//li[text()='Create Event']"));
		createEvent.click();
		WebElement form= driver.findElement(By.className("manageEvent--form"));
		form.findElement(By.id("eventName")).sendKeys("Test Event");
		WebElement dropdownType= form.findElement(By.id("eventType"));
		Select dropdownT = new Select(dropdownType);
		dropdownT.selectByVisibleText("EXPO");
		WebElement dropdownLocation= form.findElement(By.id("eventLocation"));
		Select dropdownL = new Select(dropdownLocation);
		dropdownL.selectByVisibleText("Slavonski Brod");
		form.findElement(By.id("eventDate")).sendKeys("06/25/2024");
		form.findElement(By.id("eventStartTime")).sendKeys("13:00");
		form.findElement(By.id("eventDuration")).sendKeys("17:00");
		form.findElement(By.id("eventUrl")).sendKeys("www.test.com");
		form.findElement(By.id("eventDescription")).sendKeys("Test description");
		By uploadButtonXPath = By.xpath("//div[@class='upload__image-wrapper']//button[contains(text(), 'Click or Drop here')]");
		WebElement fileInput=driver.findElement(uploadButtonXPath);
		fileInput.click();
		Thread.sleep(7000);
		driver.findElement(By.cssSelector("input[type='submit']")).click();
		Thread.sleep(2000);
		Alert alert = driver.switchTo().alert();
		String alertText = alert.getText();
		alert.accept();

		boolean success = alertText.equals("Event added!");
		assertEquals(true, success);
		driver.quit();
	}

	@Test
	public void testChangePassword() throws InterruptedException {

		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.get("http://localhost:3000/login");
		WebElement element = driver.findElement(By.name("Email"));
		element.sendKeys("admin@gmail.com");
		element = driver.findElement(By.name("password"));
		element.sendKeys("Admin123");
		driver.findElement(By.cssSelector("input[type='submit']")).click();
		Thread.sleep(1000);
		WebElement menuDiv = driver.findElement(By.className("menu"));
		menuDiv.click();
		WebElement editProfile=driver.findElement(By.xpath(".//li[text()='Profile']"));
		editProfile.click();
		driver.findElement(By.className("changePasswordButton")).click();
		driver.findElement(By.id("oldPassword")).sendKeys("Admin123");
		driver.findElement(By.id("newPassword")).sendKeys("Admin321");
		driver.findElement(By.id("confirmNewPassword")).sendKeys("Admin321");
		driver.findElement(By.cssSelector("input[type='submit']")).click();
		Thread.sleep(2000);
		Alert alert = driver.switchTo().alert();
		String alertText = alert.getText();
		alert.accept();

		boolean success = alertText.equals("Password edited!");
		assertEquals(true, success);
		driver.quit();
	}

	@Test
	public void testChangeProfileView() throws InterruptedException {

		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.get("http://localhost:3000/login");
		WebElement element = driver.findElement(By.name("Email"));
		element.sendKeys("capsidomi@gmail.com");
		element = driver.findElement(By.name("password"));
		element.sendKeys("Capsidomi123");
		driver.findElement(By.cssSelector("input[type='submit']")).click();
		Thread.sleep(1000);
		WebElement menuDiv = driver.findElement(By.className("menu"));
		menuDiv.click();
		WebElement editProfile = driver.findElement(By.xpath(".//li[text()='Profile']"));
		editProfile.click();
		driver.findElement(By.className("viewPublicButton")).click();
		String redirectUrl = driver.getCurrentUrl();

		boolean success = redirectUrl.equals("http://localhost:3000/profile/public/capsidomi@gmail.com");
		assertEquals(true, success);

		driver.quit();


	}

	@Mock
	private UserRepository userRepository;
	@Mock
	private UserService userService;
	@Autowired
	private EventService eventService;
	@Autowired
	private EventRepository eventRepository;

	@Test
	@DisplayName("Test addEvent")
	void testAddEvent() {
		Event inputEvent = new Event();
		inputEvent.setEventName("Test Event");

		Event result = eventService.addEvent(inputEvent);

		assertEquals("Test Event", result.getEventName());
	}

	@Test
	@DisplayName("Test editEvent")
	void testEditEvent() {
		Event originalEvent = new Event();
		originalEvent.set_id(1L);
		originalEvent.setEventName("Original Event Name");

		String updatedName = "Updated Event Name";
		originalEvent.setEventName(updatedName);

		Event editedEvent = eventService.editEvent(originalEvent);

		assertEquals(updatedName, editedEvent.getEventName());
	}

	@Test
	@DisplayName("Test getUserById")
	void testGetUserById() {
		String userId = "capsi@gmail.com";
		Optional<User> mockUser = userRepository.findByEmail(userId);
		when(userService.getUserById(userId)).thenReturn(mockUser);

		Optional<User> result = userService.getUserById(userId);

		assertEquals(mockUser, result);
	}

	@Test
	@DisplayName("Test getUserById not found")
	void testGetUserByIdNotFound() {
		String userId = "nepostojeci@gmail.com";
		when(userRepository.findById(userId)).thenReturn(Optional.empty());

		Optional<User> result = userService.getUserById(userId);

		assertEquals(Optional.empty(), result);
	}

	@Test
	@DisplayName("Test AllEvents")
	void testAllEvents(){
		List<Event> allEvents = eventRepository.findAll();

		assertEquals(eventService.allEvents(), allEvents);
	}

	@Test
	@DisplayName("Test singleEventId")
	void testGetEventById(){
		Optional<Event> singleEvent = eventRepository.findBy_id(2L);

		assertEquals(eventService.singleEventId(2L), singleEvent);
	}

}
