import { Table } from "../components/Table";

const dataKaryawan = [
  {
    id: 1,
    nama: "Brigit",
    posisi: "Quality Engineer",
    divisi: "Support",
  },
  {
    id: 2,
    nama: "Washington",
    posisi: "Database Administrator IV",
    divisi: "Sales",
  },
  {
    id: 3,
    nama: "Barde",
    posisi: "Dental Hygienist",
    divisi: "Services",
  },
  {
    id: 4,
    nama: "Dreddy",
    posisi: "Teacher",
    divisi: "Engineering",
  },
  {
    id: 5,
    nama: "Keslie",
    posisi: "Biostatistician II",
    divisi: "Accounting",
  },
  {
    id: 6,
    nama: "Boniface",
    posisi: "Physical Therapy Assistant",
    divisi: "Sales",
  },
  {
    id: 7,
    nama: "Felix",
    posisi: "Executive Secretary",
    divisi: "Human Resources",
  },
  {
    id: 8,
    nama: "Johannes",
    posisi: "Senior Developer",
    divisi: "Training",
  },
  {
    id: 9,
    nama: "Gael",
    posisi: "Engineer II",
    divisi: "Human Resources",
  },
  {
    id: 10,
    nama: "Jacquenette",
    posisi: "Internal Auditor",
    divisi: "Accounting",
  },
  {
    id: 11,
    nama: "Monroe",
    posisi: "Project Manager",
    divisi: "Legal",
  },
  {
    id: 12,
    nama: "Damian",
    posisi: "Executive Secretary",
    divisi: "Business Development",
  },
  {
    id: 13,
    nama: "Puff",
    posisi: "General Manager",
    divisi: "Sales",
  },
  {
    id: 14,
    nama: "Floyd",
    posisi: "Web Developer III",
    divisi: "Product Management",
  },
  {
    id: 15,
    nama: "Errol",
    posisi: "Environmental Specialist",
    divisi: "Product Management",
  },
  {
    id: 16,
    nama: "Carlina",
    posisi: "Research Assistant I",
    divisi: "Research and Development",
  },
  {
    id: 17,
    nama: "Bonnie",
    posisi: "Financial Advisor",
    divisi: "Product Management",
  },
  {
    id: 18,
    nama: "Gustaf",
    posisi: "Account Representative III",
    divisi: "Business Development",
  },
  {
    id: 19,
    nama: "Karin",
    posisi: "Web Developer II",
    divisi: "Marketing",
  },
  {
    id: 20,
    nama: "Gilbertina",
    posisi: "Professor",
    divisi: "Marketing",
  },
  {
    id: 21,
    nama: "Jany",
    posisi: "Staff Scientist",
    divisi: "Services",
  },
  {
    id: 22,
    nama: "Benton",
    posisi: "Help Desk Operator",
    divisi: "Product Management",
  },
];

const defaultColumns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "posisi",
    header: "Posisi",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "divisi",
    header: "Divisi",
    cell: (info) => info.getValue(),
  },
];

export function Karyawan() {
  return (
    <div class="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6">Data Karyawan</h2>
      <Table data={dataKaryawan} columns={defaultColumns} />
    </div>
  );
}
