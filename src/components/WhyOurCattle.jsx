
import Image from "next/image";
import farming1 from "@/assets/farming-1.jpg";
import farming2 from "@/assets/farming-2.jpg";
import farming3 from "@/assets/farming-3.jpg";

export default function WhyOurCattle() {
  return (
    <section className="py-15 md:py-20 px-5">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-14 animate__animated animate__fadeInDown">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-[2px] bg-[#FFCC4D]"></span>
            <span className="text-[10px] text-[#253237] font-black uppercase tracking-[0.3em]">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#253237] uppercase italic tracking-tighter text-center mb-3">
            What make our cattle <span className="text-gray-300">great?</span>
          </h2>
          <p className="text-gray-500 max-w-xl text-center text-base md:text-lg font-medium">
            Learn why you should choose our cattle for your Qurbani — we ensure the best practices, natural growth, and top health for every animal.
          </p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-7 flex flex-col hover:shadow-2xl transition-shadow border border-gray-100">
            <Image
              src={farming1}
              alt="Cattle in farm eating natural feed"
              width={400}
              height={220}
              className="rounded-2xl object-cover mb-4"
            />
            <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#253237] uppercase">Farming practices</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              The crucial aspect to great quality meat is in the nurturing of the livestock. We practice all-natural processes in the upbringing of the cattle, its food habit and habitat. Our cattle grow up in freedom & comfort, eat & drink to their desire, always live in a clean environment and periodically get checked for any diseases.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-7 flex flex-col hover:shadow-2xl transition-shadow border border-gray-100">
            <Image
              src={farming2}
              alt="Cattle grazing on green field"
              width={400}
              height={220}
              className="rounded-2xl object-cover mb-4"
            />
            <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#253237] uppercase">Naturally Grown</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Our cattle are fed organic feed grown at our own farm without any kind of steroids or growth hormones. Artificial chemicals may make the cattle gain mass quicker but it is harmful to the cattle and is also not Halal or Safe to consume. Our natural feed practices ensure our cattle grow right.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-7 flex flex-col hover:shadow-2xl transition-shadow border border-gray-100">
            <Image
              src={farming3}
              alt="Veterinarian checking cattle health"
              width={400}
              height={220}
              className="rounded-2xl object-cover mb-4"
            />
            <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#253237] uppercase">Healthy & Disease-free</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Our cattle are routinely health-checked and certified by veterinarians. All cattle are vaccinated against major diseases, grown naturally, and anti-biotic free. We inspect their blood and stool to make sure that only the healthy and safe reach you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
