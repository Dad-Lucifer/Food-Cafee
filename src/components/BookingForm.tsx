import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, Users, User, Mail, Phone } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  specialRequests: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
  occasion?: string;
}

const BookingForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2", // Default value
    occasion: "casual",
    specialRequests: ""
  });

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Time options for booking
  const timeOptions = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM"
  ];

  // Guest count options
  const guestOptions = [
    { value: "1", label: "1 Guest" },
    { value: "2", label: "2 Guests" },
    { value: "3", label: "3 Guests" },
    { value: "4", label: "4 Guests" },
    { value: "5", label: "5 Guests" },
    { value: "6", label: "6 Guests" },
    { value: "7", label: "7 Guests" },
    { value: "8", label: "8 Guests" },
    { value: "9", label: "9 Guests" },
    { value: "10", label: "10+ Guests" }
  ];

  // Occasion options
  const occasionOptions = [
    { value: "casual", label: "Casual Dining" },
    { value: "birthday", label: "Birthday" },
    { value: "anniversary", label: "Anniversary" },
    { value: "business", label: "Business Meeting" },
    { value: "date", label: "Date Night" },
    { value: "other", label: "Other" }
  ];

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.time) {
      errors.time = "Time is required";
    }

    if (!formData.guests) {
      errors.guests = "Number of guests is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Debug: Log form data to see what's being submitted
      console.log("Form data being submitted:", formData);

      // Format data for Formspree API
      // Formspree expects flat key-value pairs, not nested objects
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('date', formData.date);
      formDataToSubmit.append('time', formData.time);
      formDataToSubmit.append('guests', formData.guests); // Explicitly adding guests
      formDataToSubmit.append('occasion', formData.occasion);
      formDataToSubmit.append('specialRequests', formData.specialRequests);

      // Debug: Log FormData entries
      console.log("FormData entries:");
      for (let pair of formDataToSubmit.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // Submit to Formspree API
      const response = await fetch('https://formspree.io/f/xldzzvbv', {
        method: 'POST',
        body: formDataToSubmit,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      // Set submitted state to show success message
      setIsSubmitted(true);

      // Redirect to home page after 8 seconds (changed from 3 seconds)
      setTimeout(() => {
        // Scroll to top of page first
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Then navigate to home
        navigate('/');
      }, 8000); // Changed from 3000 to 8000 milliseconds (8 seconds)

    } catch (error) {
      console.error('Error submitting booking:', error);
      // Handle error state here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Reserve Your Table
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book a table with us and experience perfect blend of delicious food and warm hospitality
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="text-center text-2xl">Table Reservation</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for your reservation. We've sent a confirmation email to {formData.email}.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  You will be redirected to homepage in 8 seconds...
                </p>
                {/* Progress indicator for 8-second countdown */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-amber-500 h-2 rounded-full progress-bar" style={{ animation: 'progress 8s linear forwards' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Please wait while we redirect you...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-amber-600" />
                      Name*
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-amber-600" />
                      Email*
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-amber-600" />
                      Phone*
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-red-500">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Number of Guests Field - Fixed with proper name attribute */}
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-600" />
                      Number of Guests*
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) => handleSelectChange('guests', value)}
                      name="guests" // Added name attribute
                    >
                      <SelectTrigger className={formErrors.guests ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.guests && (
                      <p className="text-sm text-red-500">{formErrors.guests}</p>
                    )}
                  </div>

                  {/* Date Field */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-amber-600" />
                      Date*
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      value={formData.date}
                      onChange={handleInputChange}
                      className={formErrors.date ? "border-red-500" : ""}
                    />
                    {formErrors.date && (
                      <p className="text-sm text-red-500">{formErrors.date}</p>
                    )}
                  </div>

                  {/* Time Field */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      Time*
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => handleSelectChange('time', value)}
                      name="time" // Added name attribute
                    >
                      <SelectTrigger className={formErrors.time ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map(time => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formErrors.time && (
                      <p className="text-sm text-red-500">{formErrors.time}</p>
                    )}
                  </div>

                  {/* Occasion Field */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="occasion">Occasion</Label>
                    <Select
                      value={formData.occasion}
                      onValueChange={(value) => handleSelectChange('occasion', value)}
                      name="occasion" // Added name attribute
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        {occasionOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Special Requests Field */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <Textarea
                      id="specialRequests"
                      name="specialRequests"
                      placeholder="Any dietary restrictions or special requests?"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-full transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Reserve Table"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add CSS for progress bar animation */}
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .progress-bar {
          animation: progress 8s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default BookingForm;